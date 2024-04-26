package lt.codecrusaders.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "\"tasks\"")
public class Task {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private EPriority priority = EPriority.LOW;
    @Enumerated(EnumType.STRING)
    private EStatus status = EStatus.TODO;
    private Date created;
    private Date edited;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "project_id")
    private Project project;
}
