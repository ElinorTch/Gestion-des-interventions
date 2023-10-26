package com.intervention.app.intervention.dto;

import com.intervention.app.intervention.entities.Departement;
import com.intervention.app.intervention.entities.Intervention;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonnelDto {

    private Long id;
    private String login;
//    private String departement;
    private String token;
}
