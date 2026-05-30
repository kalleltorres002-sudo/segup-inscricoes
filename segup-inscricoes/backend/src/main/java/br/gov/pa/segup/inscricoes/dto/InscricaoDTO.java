package br.gov.pa.segup.inscricoes.dto;

import br.gov.pa.segup.inscricoes.model.Inscricao;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class InscricaoDTO {

    public static class Request {
        @NotBlank(message = "Nome completo e obrigatorio")
        private String nomeCompleto;

        @NotBlank(message = "CPF e obrigatorio")
        private String cpf;

        @NotBlank(message = "E-mail e obrigatorio")
        @Email(message = "E-mail invalido")
        private String email;

        @NotBlank(message = "Telefone e obrigatorio")
        private String telefone;

        @NotBlank(message = "Servico e obrigatorio")
        private String servicoCursoEvento;

        private String observacao;

        public String getNomeCompleto() { return nomeCompleto; }
        public void setNomeCompleto(String v) { this.nomeCompleto = v; }
        public String getCpf() { return cpf; }
        public void setCpf(String v) { this.cpf = v; }
        public String getEmail() { return email; }
        public void setEmail(String v) { this.email = v; }
        public String getTelefone() { return telefone; }
        public void setTelefone(String v) { this.telefone = v; }
        public String getServicoCursoEvento() { return servicoCursoEvento; }
        public void setServicoCursoEvento(String v) { this.servicoCursoEvento = v; }
        public String getObservacao() { return observacao; }
        public void setObservacao(String v) { this.observacao = v; }
    }

    public static class Response {
        private Long id;
        private String protocolo;
        private String nomeCompleto;
        private String cpf;
        private String email;
        private String telefone;
        private String servicoCursoEvento;
        private String observacao;
        private Inscricao.StatusInscricao status;
        private LocalDateTime dataCriacao;
        private LocalDateTime dataAtualizacao;
        private String urlConfirmacao;

        public static Response fromEntity(Inscricao i, String baseUrl) {
            Response r = new Response();
            r.id = i.getId();
            r.protocolo = i.getProtocolo();
            r.nomeCompleto = i.getNomeCompleto();
            r.cpf = i.getCpf();
            r.email = i.getEmail();
            r.telefone = i.getTelefone();
            r.servicoCursoEvento = i.getServicoCursoEvento();
            r.observacao = i.getObservacao();
            r.status = i.getStatus();
            r.dataCriacao = i.getDataCriacao();
            r.dataAtualizacao = i.getDataAtualizacao();
            r.urlConfirmacao = baseUrl + "/confirmacao/" + i.getProtocolo();
            return r;
        }

        public Long getId() { return id; }
        public String getProtocolo() { return protocolo; }
        public String getNomeCompleto() { return nomeCompleto; }
        public String getCpf() { return cpf; }
        public String getEmail() { return email; }
        public String getTelefone() { return telefone; }
        public String getServicoCursoEvento() { return servicoCursoEvento; }
        public String getObservacao() { return observacao; }
        public Inscricao.StatusInscricao getStatus() { return status; }
        public LocalDateTime getDataCriacao() { return dataCriacao; }
        public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
        public String getUrlConfirmacao() { return urlConfirmacao; }
    }
}