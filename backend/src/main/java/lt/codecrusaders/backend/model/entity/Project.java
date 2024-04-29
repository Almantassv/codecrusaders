package lt.codecrusaders.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lt.codecrusaders.backend.model.dto.ProjectCreationDTO;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "\"projects\"")
@Data
public class Project {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;

    private String name;
    private String description;
    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    public Project(ProjectCreationDTO projectCreationDTO) {
        this.name = projectCreationDTO.getName();
        this.description = projectCreationDTO.getDescription();
        this.status = projectCreationDTO.getStatus();
        this.tasks = new ArrayList<>();
    }

    public Project() {

    }

    public void addTask(Task task) {
        tasks.add(task);
    }
}