package lt.codecrusaders.backend.fdtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginFDTO {
    private String username;
    private String password;
}
