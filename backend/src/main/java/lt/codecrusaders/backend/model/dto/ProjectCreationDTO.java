package lt.codecrusaders.backend.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.ToString;
import lt.codecrusaders.backend.model.entity.ProjectStatus;

@ToString
@Data
public class ProjectCreationDTO {
    @NotEmpty
    @Size(min = 1, max = 50, message = "Name must be between 1 and 50 characters")
    private String name;
    @Size(min = 0, max = 200, message = "Description must be between 0 and 200 characters")
    private String description;
    private ProjectStatus status;
}