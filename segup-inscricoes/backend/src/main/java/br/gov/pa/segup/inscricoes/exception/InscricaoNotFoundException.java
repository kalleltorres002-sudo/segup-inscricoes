package br.gov.pa.segup.inscricoes.exception;

public class InscricaoNotFoundException extends RuntimeException {
    public InscricaoNotFoundException(String message) {
        super(message);
    }
}