package lt.codecrusaders.backend.model.dto;

import lombok.Data;

@Data
public class TaskCreationDTO {
    private String name;
    private String description;
    private String priority;
    private String status;
}
