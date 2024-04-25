// const getProjects = async (req: FastifyRequest, res: FastifyReply) => {};
export async function createProject({ title, context, tags, media, author_id, }, prisma) {
    await prisma.project.create({
        data: {
            title,
            tags: tags || [],
            context,
            media: media || [],
            author: {
                connect: {
                    id: author_id,
                },
            },
        },
    });
}
export async function getProjects(prisma) {
    return await prisma.project.findMany({});
}
export async function getProjectById(id, prisma) {
    return await prisma.project.findUnique({
        where: {
            id,
            projectStatus: "ACTIVE",
        },
    });
}
export async function deleteProject(id, prisma) {
    return await prisma.project.update({
        where: {
            id,
        },
        data: {
            projectStatus: "ARCHIVED",
        },
    });
}
export async function updateProject({ projectId, title, context, tags, media, }, prisma) {
    const oldProjectPost = await prisma.project.findUnique({
        where: { id: projectId },
    });
    if (!oldProjectPost)
        throw new Error("Project not found");
    return await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            title: title || oldProjectPost.title,
            context: context || oldProjectPost.context,
            tags: tags || oldProjectPost.tags,
            media: media || oldProjectPost.media,
        },
    });
}
export async function projectLikeToggle({ userId, projectId }, prisma) {
    const data = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            liked_projects: {
                where: { id: projectId },
                select: {
                    id: true,
                },
            },
        },
    });
    if (!data)
        throw new Error("User not found");
    if (data.liked_projects.length <= 0)
        await prisma.user.update({
            where: { id: userId },
            data: {
                liked_projects: {
                    connect: {
                        id: projectId,
                    },
                },
            },
        });
    else
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                liked_projects: {
                    disconnect: {
                        id: projectId,
                    },
                },
            },
        });
}
