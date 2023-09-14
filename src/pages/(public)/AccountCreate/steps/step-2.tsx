import { StyleSheet, Text } from "react-native";
import CustomInputWithTextAndIcon from "../../../../components/Input/CustomInputWithTextAndIcon";
import { useState } from "react";

import moment from "moment";
import { cpf, cnpj } from "cpf-cnpj-validator";
import { PADDINGS } from "../../../../constants/Paddings";
import { COLORS } from "../../../../constants/Colors";

interface Step2Props {
  type: string;
  retProps(document: string, date: string, errors: Array<String>): void;
}

export default function Step2({ type, retProps }: Step2Props) {
  const [errors, setErrors] = useState([]);
  const [document, setDocument] = useState("");
  const [date, setDate] = useState("");

  const documentMask = type === "pf" ? "999.999.999-99" : "99.999.999/9999-99";
  const dateMask = "99/99/9999";

  const validateCpf = (val: string) => cpf.isValid(val);
  const validateCnpj = (val: string) => cnpj.isValid(val);

  return (
    <>
      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        marginTop={40}
        label={type === "pf" ? "CPF" : "CNPJ"}
        mask={documentMask}
        onChangeText={(_, value) => {
          if (type === "pf") {
            if (!validateCpf(value)) {
              if (!errors.includes("document"))
                setErrors([...errors, "document"]);
            } else {
              setErrors(errors.filter((error) => error !== "document"));
            }
          } else {
            if (!validateCnpj(value)) {
              if (!errors.includes("document"))
                setErrors([...errors, "document"]);
            } else {
              setErrors(errors.filter((error) => error !== "document"));
            }
          }

          setDocument(value);
          retProps(value, date, errors);
        }}
        error={errors.includes("document")}
        erroMessage={type === "pf" ? "CPF inválido" : "CNPJ inválido"}
        value={document}
        placeholder={type === "pf" ? "000.000.000-00" : "00.000.000/0000-00"}
      />

      <CustomInputWithTextAndIcon
        autoCapitalize="none"
        keyboardType={"numeric"}
        marginTop={20}
        label={type === "pf" ? "Data de Nascimento" : "Data de Fundação"}
        mask={dateMask}
        onChangeText={(_, value) => {
          if (!moment(value, "DD/MM/YYYY").isValid()) {
            if (!errors.includes("date")) setErrors([...errors, "date"]);
          } else {
            setErrors(errors.filter((error) => error !== "date"));
          }

          setDate(value);
          retProps(document, value, errors);
        }}
        error={errors.includes("date")}
        erroMessage="Data inválida"
        value={date}
        placeholder={type === "pf" ? "dd/mm/aaaa" : "dd/mm/aaaa"}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  body: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
    borderTopLeftRadius: 100,
    paddingTop: 50,
    paddingHorizontal: PADDINGS.horizontal,
  },
  newAccount: {
    color: COLORS.grayColor,
  },
  createNow: {
    color: COLORS.blueColor,
    fontWeight: "bold",
  },
  input: {
    marginTop: 120,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: COLORS.grayColor,
    borderRadius: 7,
  },
  label: {
    color: COLORS.blueColor,
  },
  inputText: {
    color: COLORS.grayColor,
    marginTop: 10,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: COLORS.grayColor,
    fontSize: 12,
    textAlign: "right",
    marginTop: 10,
  },
  signInButton: {
    color: COLORS.whiteColor,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  orSignInWith: {
    color: COLORS.grayColor,
    textAlign: "center",
    marginTop: 50,
  },
  socialButtons: {
    display: "flex",
    width: "55%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },
  invalidEmail: {
    marginTop: 3,
    marginLeft: 2,
    color: COLORS.dangerColor,
    fontSize: 10,
  },
});
