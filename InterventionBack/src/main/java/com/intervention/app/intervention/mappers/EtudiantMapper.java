package com.intervention.app.intervention.mappers;

import com.intervention.app.intervention.dto.EtudiantDto;
import com.intervention.app.intervention.entities.Etudiant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EtudiantMapper {

    @Mapping(source = "codeEtudiant", target = "id")
    @Mapping(source = "matricule", target = "login")
    EtudiantDto toetudiantDto(Etudiant etudiant);
}
