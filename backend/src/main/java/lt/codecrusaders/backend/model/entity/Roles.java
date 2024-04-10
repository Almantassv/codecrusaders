package lt.codecrusaders.backend.model.entity;

import lombok.Getter;

@Getter
public enum Roles {
    USER(1, "User"),
    ADMIN(2, "Admin");

    private final int roleId;
    private final String roleName;

    Roles(int roleId, String roleName) {
        this.roleId = roleId;
        this.roleName = roleName;
    }

    public static Roles getRoleById(int roleId) {
        for (Roles role : Roles.values()) {
            if (role.getRoleId() == roleId) {
                return role;
            }
        }
        return null;
    }
}