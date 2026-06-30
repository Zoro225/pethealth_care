package com.pettracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "pets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Pet name is required")
    @Column(nullable = false)
    private String name;

    @Min(value = 0, message = "Age cannot be negative")
    @Column(nullable = false)
    private int age;

    @NotBlank(message = "Pet type is required")
    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private boolean illness;

    @Column(columnDefinition = "TEXT")
    private String illnessDescription;

    @Pattern(regexp = "Yes|No", message = "Vaccinated must be 'Yes' or 'No'")
    @Column(nullable = false)
    private String vaccinated;

    @Column(nullable = false)
    private int checkupCount = 0;

    // Stores the base64 image data URL (e.g. "data:image/jpeg;base64,...")
    @Column(columnDefinition = "LONGTEXT")
    private String photoUrl;
}
