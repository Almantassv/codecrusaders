package lt.codecrusaders.backend.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lt.codecrusaders.backend.model.fdto.UserRegisterFDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Entity
@Table(name = "\"user\"")
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String username;
    private String email;
    private String password;
    private int roleID;

    @Transient
    private Collection<? extends GrantedAuthority> authorities;

    public User(UserRegisterFDTO userRegisterFDTO) {
        this.username = userRegisterFDTO.getUsername();
        this.email = userRegisterFDTO.getEmail();
        this.password = userRegisterFDTO.getPassword();
    }

    public User() {

    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
