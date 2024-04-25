import { FastifyReply, FastifyRequest } from "../types/fastify";
import { storeFile } from "../utils/fileManager";

/**
 * Multipart Consumer for non-arbitrary files and fields
 * body type = Record<string, string>
 * @param req
 * @param res
 */
export async function multipartConsumer(
  req: FastifyRequest<{ Body: any }>,
  res: FastifyReply,
) {
  let body: Record<string, any> = {};
  if (!req.isMultipart() || req.isMultipart() === undefined) return;

  const parts = req.parts();

  try {
    for await (const part of parts) {
      // Store file to a temporary Folder
      if (part.type === "file") {
        console.log("file entered");
        if (part.file.truncated)
          return res.status(413).send({ message: "File too large" });

        if (
          part.filename === undefined ||
          part.filename === null ||
          part.filename === ""
        ) {
          part.file.on("data", () => {});
          part.file.on("end", () => {});
          continue;
        }
        storeFile(part, "tmp")
          .then((fileInfo) => {
            body[part.fieldname] = fileInfo;
          })
          .catch((error) => {
            console.error("Error in Multiaprt Consumer", error);
            body[part.fieldname] = null;
          });
      } else if (part.type === "field") {
        console.log({ fields: part.fieldname });
        body[part.fieldname] = part.value;
      }
    }
  } catch (error) {
    console.error("Error in Multiaprt Consumer", error);
    res.status(500).send({ message: "Internal Server Error" });
  } finally {
    req.body = body;
    console.log({ body });
  }
}

/**
 * Multipart Consumer for arbitrary numner of files and fields
 * body type = Record<string, string> & media: {caption?: string, filename: string}[]
 * ? Client Side must have a field in the form Data for uploading medias ie. caption-[hash], image-[hash], video-[hash]
 * @param req
 * @param res
 * @returns
 */
export async function arbitraryMultipartConsumer(
  req: FastifyRequest<{ Body: Record<string, any> }>,
  res: FastifyReply,
) {
  console.log({ isMultipart: req.isMultipart() });
  if (!req.isMultipart() || req.isMultipart() === undefined) return;
  const parts = req.parts();
  let body: Record<string, any> = {};

  const media: Record<
    string,
    { caption: string | null; filename: string | null }
  > = {};

  try {
    for await (const part of parts) {
      if (part.type === "field") {
        console.log({ field: true, fields: part.fieldname });
        if (part.fieldname.includes("caption-")) {
          const hash = part.fieldname.split("-")[1] as string;
          if (media[hash] === undefined)
            media[hash] = { caption: part.value as string, filename: null };
          media[hash].caption = part.value as string;
        } else if (
          part.fieldname === "tags" &&
          typeof part.value === "string"
        ) {
          const tags = part.value.replace(/(\s|\[|\]|#)/g, "").split(",");
          body[part.fieldname] = tags;
        } else body[part.fieldname] = part.value;
      }
      if (part.type === "file") {
        console.log(`file Entered: ${part.fieldname}`);
        if (part.file.truncated)
          return res.status(413).send({ message: "File too large" });
        if (
          part.fieldname.includes("image-") ||
          part.fieldname.includes("video-")
        ) {
          const hash = part.fieldname.split("-")[1] as string;
          if (media[hash] === undefined)
            media[hash] = {
              caption: null,
              filename: (await storeFile(part, "tmp")).filename,
            };
          else media[hash].filename = (await storeFile(part, "tmp")).filename;
        }
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    req.body = {
      ...body,
      media:
        Object.values(media).filter((elem) => elem.filename !== null) ||
        undefined,
    };
  }
}

// function partsConsumer(pstyd )
