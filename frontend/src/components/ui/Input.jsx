import styles from "@/styles/styles";

function Input({ value, onChange, placeholder, type = "text", style = {} }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        ...styles.input,
        ...style
      }}
    />
  );
}

export default Input;