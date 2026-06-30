package com.pettracker.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDTO {

    private Long id;

    @NotBlank(message = "Pet name is required")
    private String name;

    @Min(value = 0, message = "Age cannot be negative")
    private int age;

    @NotBlank(message = "Pet type is required")
    private String type;

    private boolean illness;

    private String illnessDescription;

    @Pattern(regexp = "Yes|No", message = "Vaccinated must be 'Yes' or 'No'")
    @NotBlank(message = "Vaccination status is required")
    private String vaccinated;

    private int checkupCount;

    private String photoUrl;
}
