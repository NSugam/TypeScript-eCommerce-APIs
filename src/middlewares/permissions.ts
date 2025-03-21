import { rolePermissionEntity } from "../entity/rolePermissionEntity";

export const permissionMiddleware = () => {
    return async (req: any, res: any, next: any) => {
        const role = req.user.role
        const route = req.baseUrl.replace(/^\/api\//, "")
        const action = req.method.toLowerCase()

        console.log(req.user.role)

        if (!role)
            return res.status(403).json({ message: "User's role not available", success: false });

        const hasPermission = await rolePermissionEntity.findOne({
            where: {
                role: { name: role },
                route: { name: route },
                permission: { name: action }
            },
            relations: ["role", "route", "permission"]
        });

        if (!hasPermission)
            return res.status(403).json({ message: "Permission Denied", success: false });

        next();

    };
};