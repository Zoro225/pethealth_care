package com.pettracker.service;

import com.pettracker.dto.PetDTO;
import com.pettracker.exception.ResourceNotFoundException;
import com.pettracker.model.Pet;
import com.pettracker.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PetServiceImpl implements PetService {

    private final PetRepository petRepository;

    @Override
    public List<PetDTO> getAllPets() {
        return petRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public PetDTO getPetById(Long id) {
        return toDTO(petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with ID: " + id)));
    }

    @Override
    public PetDTO addPet(PetDTO dto) {
        validateIllness(dto);
        return toDTO(petRepository.save(toEntity(dto)));
    }

    @Override
    public PetDTO updatePet(Long id, PetDTO dto) {
        Pet existing = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet not found with ID: " + id));
        validateIllness(dto);

        if (!existing.isIllness() && dto.isIllness()) {
            dto.setCheckupCount(existing.getCheckupCount() + 1);
        } else {
            dto.setCheckupCount(existing.getCheckupCount());
        }

        existing.setName(dto.getName());
        existing.setAge(dto.getAge());
        existing.setType(dto.getType());
        existing.setIllness(dto.isIllness());
        existing.setIllnessDescription(dto.getIllnessDescription());
        existing.setVaccinated(dto.getVaccinated());
        existing.setCheckupCount(dto.getCheckupCount());
        existing.setPhotoUrl(dto.getPhotoUrl());

        return toDTO(petRepository.save(existing));
    }

    @Override
    public void deletePet(Long id) {
        if (!petRepository.existsById(id))
            throw new ResourceNotFoundException("Pet not found with ID: " + id);
        petRepository.deleteById(id);
    }

    @Override
    public List<PetDTO> searchByName(String name) {
        return petRepository.findByNameContainingIgnoreCase(name)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPets",         petRepository.count());
        stats.put("sickPets",          petRepository.countByIllnessTrue());
        stats.put("healthyPets",       petRepository.countByIllnessFalse());
        stats.put("vaccinatedPets",    petRepository.countByVaccinated("Yes"));
        stats.put("notVaccinatedPets", petRepository.countByVaccinated("No"));
        Long total = petRepository.sumCheckupCount();
        stats.put("totalCheckups", total != null ? total : 0);
        return stats;
    }

    // ── Helpers ────────────────────────────
    private void validateIllness(PetDTO dto) {
        if (dto.isIllness() && (dto.getIllnessDescription() == null || dto.getIllnessDescription().isBlank()))
            throw new IllegalArgumentException("Illness description is required when illness is true.");
    }

    private PetDTO toDTO(Pet p) {
        return PetDTO.builder()
                .id(p.getId()).name(p.getName()).age(p.getAge()).type(p.getType())
                .illness(p.isIllness()).illnessDescription(p.getIllnessDescription())
                .vaccinated(p.getVaccinated()).checkupCount(p.getCheckupCount())
                .photoUrl(p.getPhotoUrl())
                .build();
    }

    private Pet toEntity(PetDTO d) {
        return Pet.builder()
                .name(d.getName()).age(d.getAge()).type(d.getType())
                .illness(d.isIllness()).illnessDescription(d.getIllnessDescription())
                .vaccinated(d.getVaccinated()).checkupCount(d.getCheckupCount())
                .photoUrl(d.getPhotoUrl())
                .build();
    }
}
