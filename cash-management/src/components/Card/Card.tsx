//importa react para poder colocar outros elementos (Nodes) dentro do card
import React from "react";

// Variáveis que o card vai ter para ele se ajustar ao contexto da página ou da ação executada
interface CardProprieties {
  // permite colocar outros componentes react dentro
  children: React.ReactNode;
}

// esta é a função principal que vai exportar o html do card construido usando os valores contidos nos parametros passados
export function Card({children }: CardProprieties) {
  return (
    // vai construir o html sendo uma sessão para ser retornada
    // dentro dela vai ter os elementos nodes enviados
    <section
      // TODO como fazer max-width: 420px; em bootstrap?
      // w-100 = width: 100% !important
      //border = border: var(--bs-border-width) var(--bs-border-style) var(--bs-border-color) !important;
      // rounded-0 = border-radius: 0 !important;
      // position-relative = position: relative !important;
      // p-4 = padding: 1.5rem !important;
      // p-md-5 = padding: 3rem !important; sobreescreve -p4 quando tamanho da tela é md
      // shadow-custom TODO não funcionou

      className="w-100 bg-surface-lowest border rounded-0 position-relative p-4 p-md-5 shadow-card">
      {children}
    </section>
  );
}

export default Card;
