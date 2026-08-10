// Variaveis do botão para ele se ajustar ao contexto da página ou da ação executada
interface InputTextProprieties {
  // identificador para poder ser possivel rastrear o botão depois
  id: string;
  // texto que vai dentro do label que vai referenciar o input
  label: string;
  // propriedade name, type, placeholder e required são do input e são opcionais
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

// Esta é a função principal que vai exportar o html do botão construido usando os valores contidos nos parametros passados
export function InputText({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: InputTextProprieties) {
  return (
    // vai construir o html sendo uma div para ser retornada com dentro dela vai ter a label e o input
    // mb-4:
    <div className="mb-4">
      {/*
      TODO: ver uma forma melhor de comentário em várias linhas
      // A label recebe o o texto quando o componente e chamado // e ela aponta
      para o input com o valor do id
      */}
      <label
        htmlFor={id}
        // form-label: margin-bottom: 0.5rem;
        // text-uppercase: text-transform: uppercase !important;
        // fw-bold: font-weight: 700 !important;
        // TODO: como mudar tamanho da fonte para font-size: 0.75rem; font-size: 0.75rem;line-height: 1rem;  letter-spacing: 0.05em; no bootstrap
        // text-on-surface: ??
        // mb-2: ??
        className="form-label fw-bold text-uppercase"
      >
        {label}
      </label>
      {/*
      - Definindo o input 
      - O que é {e}? ??
      - o que é {name ?? id}?
    */}
      <input
        id={id}
        name={name ?? id}
        type={type}
        placeholder={placeholder}
        required={required}
        // form-control: TODO é necessário?? coloca várias propriedades como display block, w-100 fonte, etc
        // TODO fazer borda em bootstrap
        // px-4: padding-right: 1.5rem !important;   padding-left: 1.5rem !important; TODO VALIDAdar tamanho para ver se bate com minhas regras
        // py-3:padding-top: 1rem !important;    padding-bottom: 1rem !important; TODO VALIDAdar tamanho para ver se bate com minhas regras
        className="form-control px-4 py-3"
      />
    </div>
  );
}

export default InputText;
