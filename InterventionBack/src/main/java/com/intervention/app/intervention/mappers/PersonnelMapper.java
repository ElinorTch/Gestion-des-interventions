package com.intervention.app.intervention.mappers;

import com.intervention.app.intervention.dto.PersonnelDto;
import com.intervention.app.intervention.entities.Personnel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PersonnelMapper {

    @Mapping(source = "codePersonnel", target = "id")
    @Mapping(source = "login", target = "login")
    PersonnelDto topersonnelDto(Personnel personnel);
}
