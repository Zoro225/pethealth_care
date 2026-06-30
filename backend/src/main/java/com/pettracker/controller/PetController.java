package com.pettracker.controller;

import com.pettracker.dto.PetDTO;
import com.pettracker.service.PetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    // GET /pets — fetch all pets
    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    // GET /pets/{id} — fetch single pet
    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    // POST /pets — add new pet
    @PostMapping
    public ResponseEntity<PetDTO> addPet(@Valid @RequestBody PetDTO petDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(petService.addPet(petDTO));
    }

    // PUT /pets/{id} — update pet
    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable Long id,
                                             @Valid @RequestBody PetDTO petDTO) {
        return ResponseEntity.ok(petService.updatePet(id, petDTO));
    }

    // DELETE /pets/{id} — delete pet
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.ok(Map.of("message", "Pet deleted successfully"));
    }

    // GET /pets/search?name= — search by name
    @GetMapping("/search")
    public ResponseEntity<List<PetDTO>> searchPet(@RequestParam String name) {
        return ResponseEntity.ok(petService.searchByName(name));
    }

    // GET /pets/dashboard — analytics stats
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        return ResponseEntity.ok(petService.getDashboardStats());
    }
}
