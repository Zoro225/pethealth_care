package com.pettracker.repository;

import com.pettracker.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    // Search by name — case insensitive
    List<Pet> findByNameContainingIgnoreCase(String name);

    // Count vaccinated pets
    long countByVaccinated(String vaccinated);

    // Count sick pets
    long countByIllnessTrue();

    // Count healthy pets
    long countByIllnessFalse();

    // Dashboard: total checkups
    @Query("SELECT SUM(p.checkupCount) FROM Pet p")
    Long sumCheckupCount();
}
