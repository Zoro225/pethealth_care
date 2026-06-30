package com.pettracker.service;

import com.pettracker.dto.PetDTO;

import java.util.List;
import java.util.Map;

public interface PetService {

    List<PetDTO> getAllPets();

    PetDTO getPetById(Long id);

    PetDTO addPet(PetDTO petDTO);

    PetDTO updatePet(Long id, PetDTO petDTO);

    void deletePet(Long id);

    List<PetDTO> searchByName(String name);

    Map<String, Object> getDashboardStats();
}
