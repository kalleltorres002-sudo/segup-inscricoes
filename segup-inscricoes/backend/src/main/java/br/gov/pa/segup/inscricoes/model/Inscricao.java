package br.gov.pa.segup.inscricoes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inscricoes")
public class Inscricao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String protocolo;

    @NotBlank(message = "Nome completo e obrigatorio")
    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @NotBlank(message = "CPF e obrigatorio")
    @Column(nullable = false)
    private String cpf;

    @NotBlank(message = "E-mail e obrigatorio")
    @Email(message = "E-mail invalido")
    @Column(nullable = false)
    private String email;

    @NotBlank(message = "Telefone e obrigatorio")
    @Column(nullable = false)
    private String telefone;

    @NotBlank(message = "Servico e obrigatorio")
    @Column(name = "servico_curso_evento", nullable = false)
    private String servicoCursoEvento;

    @Column(name = "observacao")
    private String observacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusInscricao status = StatusInscricao.CONFIRMADA;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @PreUpdate
    public void preUpdate() {
        this.dataAtualizacao = LocalDateTime.now();
    }

    public enum StatusInscricao {
        CONFIRMADA, CANCELADA
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProtocolo() { return protocolo; }
    public void setProtocolo(String protocolo) { this.protocolo = protocolo; }

    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getServicoCursoEvento() { return servicoCursoEvento; }
    public void setServicoCursoEvento(String s) { this.servicoCursoEvento = s; }

    public String getObservacao() { return observacao; }
    public void setObservacao(String observacao) { this.observacao = observacao; }

    public StatusInscricao getStatus() { return status; }
    public void setStatus(StatusInscricao status) { this.status = status; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime v) { this.dataAtualizacao = v; }

}