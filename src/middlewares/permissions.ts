import { permissionEntity } from "../entity/permissionEntity";

export const permissionMiddleware = (action: string) => {
    return async (req: any, res: any, next: any) => {
        const role = req.user.role
        const route = req.baseUrl.replace(/^\/api\//, "")

        if (!role)
            return res.status(403).json({ message: "User's role not available", success: false });

        const roleData: any = await permissionEntity.findOne({ where: { name: role, route } });
        var hasPermission = await roleData.permissions.includes(action)

        if (!hasPermission)
            return res.status(403).json({ message: "Permission Denied", success: false });

        next()

    };
};