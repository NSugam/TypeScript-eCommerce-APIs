import { permissionEntity } from "../entity/permissionEntity";

const checkPermission = async (role: string, route: string, action: string) => {
    const roleData: any = await permissionEntity.findOne({ where: { name: role, route } });
    console.log(roleData.permissions.includes('add'))
    return (roleData.permissions.includes(action))
};

export const permissionMiddleware = (action: string) => {
    return async (req: any, res: any, next: any) => {
        const role = req.user.role
        const route = req.baseUrl.replace(/^\/api\//, "")

        if (!role)
            return res.status(403).json({ message: "User's role not available", success:false });

        var hasPermission = await checkPermission(role, route, action)

        if (!hasPermission)
            return res.status(403).json({ message: "Permission Denied", success:false });

        next()

    };
};