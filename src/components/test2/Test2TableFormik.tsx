import { Test2InputType } from "../../types/test2.type";
import DownloadIcon from "../../assets/download_wht.svg";
import { Field, FieldArray, Form, Formik } from "formik";

interface Test2TableFormikProps {
  headers: { text: string; value: string }[];
  initialValues: Test2InputType;
  handleSubmit: (values: Test2InputType) => void;
  tab: "BS" | "IS";
}

export default function Test2TableFormik({ headers, initialValues, handleSubmit, tab }: Test2TableFormikProps) {
  return (
    <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <table className="w-full rounded-lg border border-gray-200">
            <thead className="h-[30px] bg-gray-400 font-bold text-white">
              <tr>
                {headers.map((header: { text: string; value: string }, index: number) => (
                  <th key={`${header.value}${index}`}>
                    {header.text}
                    {header.value !== "names" && (
                      <button
                        type="submit"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-500"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit(values);
                        }}>
                        <img src={DownloadIcon} alt="다운로드 버튼" className="inline h-6 w-6" />
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <FieldArray name={`val.${tab}`}>
                {() =>
                  values.val[tab].map((item, index) => (
                    <tr key={index} className="h-[30px]">
                      <td className="td-styles px-4">{item.name}</td>
                      {Array.from({ length: headers.length - 1 }).map((_, headerIndex) => {
                        return (
                          <td
                            key={`${tab}[${item.name}].${headerIndex}}`}
                            className="td-styles border-l border-gray-200 px-4 text-right">
                            <Field
                              name={`val.${tab}[${index}].data[${headers[headerIndex + 1].value}]`}
                              placeholder=""
                              type="text"
                              className="edit-cell-styles"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const newValue = e.target.value;
                                if (!/^\d*$/.test(newValue)) {
                                  alert("숫자만 입력해주세요.");
                                  return;
                                }
                                setFieldValue(`val.${tab}[${index}].data[${headers[headerIndex + 1].value}]`, newValue);
                              }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))
                }
              </FieldArray>
            </tbody>
          </table>
        </Form>
      )}
    </Formik>
  );
}

/** 
 * Yup코드 =>  더 느려짐
 * 
 *   
 * const validationSchema = Yup.object({
    val: Yup.object({
      BS: Yup.array().of(
        Yup.object({
          name: Yup.string(),
          ntsCode: Yup.string(),
          data: Yup.object().shape(
            headers.reduce(
              (schema, header) => {
                if (header.value !== "names") {
                  schema[header.value] = Yup.mixed().test("is-number", "숫자만 입력 가능합니다.", (value) => {
                    return value === undefined || !isNaN(Number(value));
                  });
                }
                return schema;
              },
              {} as Record<string, Yup.MixedSchema>,
            ),
          ),
        }),
      ),
      IS: Yup.array().of(
        Yup.object({
          name: Yup.string(),
          ntsCode: Yup.string(),
          data: Yup.object().shape(
            headers.reduce(
              (schema, header) => {
                if (header.value !== "names") {
                  schema[header.value] = Yup.mixed().test("is-number", "숫자만 입력 가능합니다.", (value) => {
                    return value === undefined || !isNaN(Number(value));
                  });
                }
                return schema;
              },
              {} as Record<string, Yup.MixedSchema>,
            ),
          ),
        }),
      ),
    }),
  });


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema} // 필요
      enableReinitialize={true}
      onSubmit={handleSubmit}>
      ...
      <Field> ... </Field>
        <ErrorMessage      // 필요
          name={`val.${tab}[${index}].data[${headers[headerIndex + 1].value}]`}
          component="div"
          className="text-sm text-red-500"
        />
 * */
