package com.intervention.app.intervention.configuration;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.intervention.app.intervention.dto.EtudiantDto;
import com.intervention.app.intervention.dto.PersonnelDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;


@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @PostConstruct
    protected  void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String CreateTokenEtudiant(EtudiantDto dto){

        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);

        return JWT.create()
                .withIssuer(dto.getLogin())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("id", dto.getId())
                .withClaim("matricule", dto.getLogin())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateTokenEtudiant(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier  verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        EtudiantDto etudiant = EtudiantDto.builder()
                .login(decoded.getIssuer())
                .id(decoded.getClaim("id").asLong())
                .build();

        return new UsernamePasswordAuthenticationToken(etudiant, null, Collections.emptyList());
    }

    public String CreateTokenPersonel(PersonnelDto dto){

        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);

        return JWT.create()
                .withIssuer(dto.getLogin())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("id", dto.getId())
                .withClaim("login", dto.getLogin())
//                .withClaim("departement", dto.getDepartement())
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateTokenPersonnel(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier  verifier = JWT.require(algorithm).build();

        DecodedJWT decoded = verifier.verify(token);

        PersonnelDto personnelDto = PersonnelDto.builder()
                .login(decoded.getIssuer())
                .id(decoded.getClaim("id").asLong())
                .build();

        return new UsernamePasswordAuthenticationToken(personnelDto, null, Collections.emptyList());
    }


}
