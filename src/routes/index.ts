import { Router } from "express";
import { rolePermissionEntity } from "../entity/rolePermissionEntity";
const router = Router();

router.use('/user', require('./user'))

router.use('/product', require('./product'))

router.use('/cart', require('./cart'))

router.use('/order', require('./order'))

router.use('/notification', require('./fcm-notification'))

router.get('/permissions', async (req: any, res: any) => {
    const {role, route, action} = req.query;
    const permissions = await rolePermissionEntity.find({
        where: {
            role: { name: role },
            route: { name: route },
            permission: { name: action }
        },
        relations: ["role", "route", "permission"],
    });
    const formattedPermissions = permissions.map(permission => ({
        roleName: permission.role?.name,
        routeName: permission.route?.name,
        permissionName: permission.permission?.name,
    }));
    res.status(200).json({ message: "Role Based Access Control", success: true, formattedPermissions })
})

export default router;
