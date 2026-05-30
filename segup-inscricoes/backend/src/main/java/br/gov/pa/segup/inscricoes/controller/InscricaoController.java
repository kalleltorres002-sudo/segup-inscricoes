package br.gov.pa.segup.inscricoes.controller;

import br.gov.pa.segup.inscricoes.dto.InscricaoDTO;
import br.gov.pa.segup.inscricoes.service.InscricaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inscricoes")
@CrossOrigin(origins = "http://localhost:3000")
public class InscricaoController {

    private final InscricaoService service;

    public InscricaoController(InscricaoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<InscricaoDTO.Response> criar(@Valid @RequestBody InscricaoDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(request));
    }

    @GetMapping
    public ResponseEntity<List<InscricaoDTO.Response>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscricaoDTO.Response> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/protocolo/{protocolo}")
    public ResponseEntity<InscricaoDTO.Response> buscarPorProtocolo(@PathVariable String protocolo) {
        return ResponseEntity.ok(service.buscarPorProtocolo(protocolo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InscricaoDTO.Response> atualizar(@PathVariable Long id, @Valid @RequestBody InscricaoDTO.Request request) {
        return ResponseEntity.ok(service.atualizar(id, request));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<InscricaoDTO.Response> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancelar(id));
    }
}