import styles from "@/styles/styles";

function Select({ value, onChange, children, style = {} }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        ...styles.select,
        ...style
      }}
    >
      {children}
    </select>
  );
}

export default Select;