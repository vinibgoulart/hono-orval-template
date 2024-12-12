import { Controller, useFormContext } from "react-hook-form";
import { InputProps, Text, View, Input as _Input } from "tamagui";

type IInput = {
  label: string;
  name: string;
} & InputProps;

export const Input = (props: IInput) => {
  const { label, name, ...rest } = props;

  const {
    formState: { errors },
    watch,
    control,
  } = useFormContext();

  if (!name) {
    return null;
  }

  watch(name);

  const error = errors[name]?.message as string;

  const borderColorGet = () => {
    if (error) {
      return {
        bc: "$red10",
        focusStyle: { bc: "$red10" },
      };
    }

    return {};
  };

  return (
    <View>
      {label && (
        <Text
          color={"$primary"}
          fontWeight={"$5"}
          pos={"absolute"}
          t={-12}
          left={10}
          zIndex={2}
        >
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <_Input
            bg={"$colorTransparent"}
            focusStyle={{ bc: "$primary" }}
            backgroundColor={"$secondaryDark"}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            {...borderColorGet()}
            {...rest}
          />
        )}
      />
      {error && (
        <Text color={"$red10"} fontSize={"$0.5"}>
          {error}
        </Text>
      )}
      <View
        pos={"absolute"}
        top={0}
        left={8}
        width={label.length * 10}
        height={1}
        bg={"$secondary"}
        zIndex={1}
      />
    </View>
  );
};
