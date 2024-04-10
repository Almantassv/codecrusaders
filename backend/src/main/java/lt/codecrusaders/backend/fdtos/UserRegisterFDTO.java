package lt.codecrusaders.backend.fdtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterFDTO {
    private String username;
    private String email;
    private String password;
    private String confirmPassword;
}
