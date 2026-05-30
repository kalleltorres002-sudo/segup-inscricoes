package br.gov.pa.segup.inscricoes.service;

import br.gov.pa.segup.inscricoes.dto.InscricaoDTO;
import br.gov.pa.segup.inscricoes.exception.InscricaoNotFoundException;
import br.gov.pa.segup.inscricoes.exception.InscricaoJaCanceladaException;
import br.gov.pa.segup.inscricoes.model.Inscricao;
import br.gov.pa.segup.inscricoes.repository.InscricaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InscricaoService {

    private final InscricaoRepository repository;
    private static final String BASE_URL = "http://localhost:3000";

    public InscricaoService(InscricaoRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public InscricaoDTO.Response criar(InscricaoDTO.Request request) {
        Inscricao inscricao = new Inscricao();
        inscricao.setNomeCompleto(request.getNomeCompleto());
        inscricao.setCpf(request.getCpf());
        inscricao.setEmail(request.getEmail());
        inscricao.setTelefone(request.getTelefone());
        inscricao.setServicoCursoEvento(request.getServicoCursoEvento());
        inscricao.setObservacao(request.getObservacao());
        inscricao.setStatus(Inscricao.StatusInscricao.CONFIRMADA);
        inscricao.setProtocolo(gerarProtocolo());
        return InscricaoDTO.Response.fromEntity(repository.save(inscricao), BASE_URL);
    }

    public List<InscricaoDTO.Response> listar() {
        return repository.findAll().stream()
                .map(i -> InscricaoDTO.Response.fromEntity(i, BASE_URL))
                .collect(Collectors.toList());
    }

    public InscricaoDTO.Response buscarPorId(Long id) {
        return InscricaoDTO.Response.fromEntity(
            repository.findById(id).orElseThrow(() ->
                new InscricaoNotFoundException("Inscricao nao encontrada: " + id)), BASE_URL);
    }

    public InscricaoDTO.Response buscarPorProtocolo(String protocolo) {
        return InscricaoDTO.Response.fromEntity(
            repository.findByProtocolo(protocolo).orElseThrow(() ->
                new InscricaoNotFoundException("Inscricao nao encontrada: " + protocolo)), BASE_URL);
    }

    @Transactional
    public InscricaoDTO.Response atualizar(Long id, InscricaoDTO.Request request) {
        Inscricao inscricao = repository.findById(id)
                .orElseThrow(() -> new InscricaoNotFoundException("Inscricao nao encontrada: " + id));
        if (inscricao.getStatus() == Inscricao.StatusInscricao.CANCELADA)
            throw new InscricaoJaCanceladaException("Nao e possivel atualizar inscricao cancelada.");
        inscricao.setNomeCompleto(request.getNomeCompleto());
        inscricao.setCpf(request.getCpf());
        inscricao.setEmail(request.getEmail());
        inscricao.setTelefone(request.getTelefone());
        inscricao.setServicoCursoEvento(request.getServicoCursoEvento());
        inscricao.setObservacao(request.getObservacao());
        return InscricaoDTO.Response.fromEntity(repository.save(inscricao), BASE_URL);
    }

    @Transactional
    public InscricaoDTO.Response cancelar(Long id) {
        Inscricao inscricao = repository.findById(id)
                .orElseThrow(() -> new InscricaoNotFoundException("Inscricao nao encontrada: " + id));
        if (inscricao.getStatus() == Inscricao.StatusInscricao.CANCELADA)
            throw new InscricaoJaCanceladaException("Inscricao ja esta cancelada.");
        inscricao.setStatus(Inscricao.StatusInscricao.CANCELADA);
        return InscricaoDTO.Response.fromEntity(repository.save(inscricao), BASE_URL);
    }

    private String gerarProtocolo() {
        String data = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String prefixo = "INS-" + data;
        long count = repository.countByProtocoloStartingWith(prefixo);
        return String.format("%s-%04d", prefixo, count + 1);
    }
}