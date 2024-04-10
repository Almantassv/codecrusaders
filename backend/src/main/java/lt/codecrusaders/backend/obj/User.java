package lt.codecrusaders.backend.obj;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lt.codecrusaders.backend.fdtos.UserRegisterFDTO;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String email;
    @Getter
    private String password;

    public User(UserRegisterFDTO userRegisterFDTO) {
        this.username = userRegisterFDTO.getUsername();
        this.email = userRegisterFDTO.getEmail();
        this.password = userRegisterFDTO.getPassword();
    }

    public User() {

    }
}
