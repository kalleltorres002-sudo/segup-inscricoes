package br.gov.pa.segup.inscricoes.repository;

import br.gov.pa.segup.inscricoes.model.Inscricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {

    Optional<Inscricao> findByProtocolo(String protocolo);

    @Query("SELECT COUNT(i) FROM Inscricao i WHERE i.protocolo LIKE :prefixo%")
    long countByProtocoloStartingWith(String prefixo);
}