import { useMemo, useState } from "react";
import styles from "@/styles/styles";
import { METHOD_LABELS } from "@/constants/paymentMethods";

function CheckoutOverlay({
  table,
  onClose,
  onSingle,
  onSplit,
  paymentMethod,
  setPaymentMethod,
}) {
  const [cash, setCash] = useState("");

  const paidTotal = useMemo(() => {
    return (table?.payments || []).reduce((acc, p) => acc + p.amount, 0);
  }, [table]);

  const remaining = (table?.total || 0) - paidTotal;

  const cashValue = Number(cash);
  const change =
    paymentMethod === "cash" && cashValue > remaining
      ? cashValue - remaining
      : 0;

  const isCashValid =
    paymentMethod !== "cash" || cashValue >= remaining;

  const handlePay = () => {
    const amount =
      paymentMethod === "cash"
        ? Math.max(remaining, cashValue)
        : remaining;

    onSingle(paymentMethod, amount);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modalBox}>

        <h2 style={{ marginBottom: 10 }}>
          💰 Mesa #{table.number}
        </h2>

        <div style={{ fontSize: 28, fontWeight: "bold" }}>
          ₡{remaining.toFixed(2)}
        </div>

        <div style={{ display: "flex", gap: 8, margin: "15px 0" }}>
          {Object.keys(METHOD_LABELS).map((m) => (
            <button
              key={m}
              onClick={() => {
                setPaymentMethod(m);
                setCash("");
              }}
              style={{
                ...styles.presetButton,
                background:
                  paymentMethod === m ? "#2F6B73" : "#3D848F",
              }}
            >
              {METHOD_LABELS[m]}
            </button>
          ))}
        </div>

        {paymentMethod === "cash" && (
          <>
            <input
              style={styles.input}
              placeholder="Monto recibido"
              type="number"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />

            <div style={{ marginBottom: 10 }}>
              Cambio: <b>₡{change.toFixed(2)}</b>
            </div>
          </>
        )}

        <button
          style={{ ...styles.button, opacity: isCashValid ? 1 : 0.5 }}
          disabled={!isCashValid}
          onClick={handlePay}
        >
          Confirmar pago
        </button>

        <button style={styles.button} onClick={onSplit}>
          Dividir cuenta
        </button>

        <button style={styles.button} onClick={onClose}>
          Cancelar
        </button>

      </div>
    </div>
  );
}

export default CheckoutOverlay;