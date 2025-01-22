import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("12345");

  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const handleToast = () => {
    if (!toast.isActive(toastId)) {
      showNewToast();
    }
  };
  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId,
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast nativeID={uniqueToastId} action="success" variant="solid">
            <ToastTitle>Submitted!</ToastTitle>
            <ToastDescription>
              The form has been submitted successfully.
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true);
    } else {
      handleToast();
      setIsInvalid(false);
    }
  };

  async function delay() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsReady(true);
  }

  useEffect(() => {
    delay();
  });

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      {!isReady ? (
        <Box className="w-[325px] gap-4 p-3 rounded-md bg-background-100">
          <Skeleton variant="sharp" className="h-[150px]" />
          <SkeletonText _lines={3} className="h-3" />
          <HStack className="gap-2 align-middle">
            <Skeleton variant="circular" className="h-[24px] w-[24px] mr-2" />
            <SkeletonText _lines={2} gap={1} className="h-2 w-2/5" />
          </HStack>
        </Box>
      ) : (
        <>
          <Heading size="3xl">Gluestack UI V2</Heading>
          <VStack className="w-full rounded-md border border-background-200 p-4">
            <FormControl
              isInvalid={isInvalid}
              size="lg"
              isDisabled={false}
              isReadOnly={false}
              isRequired={false}
            >
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField placeholder="Enter Text here..." />
              </Input>
              <FormControlLabel className="mt-4">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  type="password"
                  placeholder="password"
                  value={inputValue}
                  onChangeText={(text) => setInputValue(text)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be atleast 6 characters.
                </FormControlHelperText>
              </FormControlHelper>
              <FormControlError>
                {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                <FormControlErrorText>
                  Atleast 6 characters are required.
                </FormControlErrorText>
              </FormControlError>

              <FormControlLabel className="mt-4">
                <FormControlLabelText>Role</FormControlLabelText>
              </FormControlLabel>
              <Select>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select option" />
                  {/* <SelectIcon className="mr-3" as={ChevronDownIcon} /> */}
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="UX Research" value="ux" />
                    <SelectItem label="Web Development" value="web" />
                    <SelectItem
                      label="Cross Platform Development Process"
                      value="Cross Platform Development Process"
                    />
                    <SelectItem
                      label="UI Designing"
                      value="ui"
                      isDisabled={true}
                    />
                    <SelectItem label="Backend Development" value="backend" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              <FormControlLabel className="mt-4">
                <FormControlLabelText>
                  Do you want Subscription?
                </FormControlLabelText>
              </FormControlLabel>
              <RadioGroup>
                <Radio
                  value="yes"
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                >
                  <RadioIndicator />
                  <RadioLabel>Yes</RadioLabel>
                </Radio>
                <Radio
                  value="no"
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                >
                  <RadioIndicator />
                  <RadioLabel>No</RadioLabel>
                </Radio>
              </RadioGroup>

              <FormControlLabel className="mt-4">
                <FormControlLabelText>Select Age</FormControlLabelText>
              </FormControlLabel>
              <Slider
                defaultValue={30}
                size="md"
                orientation="horizontal"
                isDisabled={false}
                isReversed={false}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>

              <FormControlLabel className="mt-4">
                <FormControlLabelText>Enter Description</FormControlLabelText>
              </FormControlLabel>
              <Textarea
                size="md"
                isReadOnly={false}
                isInvalid={false}
                isDisabled={false}
                className="w-full"
              >
                <TextareaInput placeholder="Your text goes here..." />
              </Textarea>

              <FormControlLabel className="mt-4">
                <FormControlLabelText>Is Verified</FormControlLabelText>
              </FormControlLabel>
              <ThemedView style={styles.switchContainer}>
                <Switch size="md" isDisabled={false} />
              </ThemedView>

              <FormControlLabel className="mt-4">
                <FormControlLabelText>
                  Selected the required supplies
                </FormControlLabelText>
              </FormControlLabel>
              <CheckboxGroup>
                <Checkbox
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                  value="food"
                >
                  <CheckboxIndicator>
                    {/* <CheckboxIcon /> */}
                  </CheckboxIndicator>
                  <CheckboxLabel>Food</CheckboxLabel>
                </Checkbox>
                <Checkbox
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                  value="clothes"
                >
                  <CheckboxIndicator>
                    {/* <CheckboxIcon /> */}
                  </CheckboxIndicator>
                  <CheckboxLabel>Clothes</CheckboxLabel>
                </Checkbox>
                <Checkbox
                  size="md"
                  isInvalid={false}
                  isDisabled={false}
                  value="medicines"
                >
                  <CheckboxIndicator>
                    {/* <CheckboxIcon /> */}
                  </CheckboxIndicator>
                  <CheckboxLabel>Medicines</CheckboxLabel>
                </Checkbox>
              </CheckboxGroup>
            </FormControl>
            <Button
              className="w-full mt-4 bg-success-500"
              size="md"
              onPress={handleSubmit}
            >
              <ButtonText className="">Submit</ButtonText>
            </Button>
          </VStack>
        </>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  container: {
    justifyContent: "center",
  },
  flagsContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: -6,
  },
  flagIcon: {
    width: 40,
    height: 30,
    resizeMode: "contain",
  },
  switchContainer: {
    alignItems: "flex-start",
  },
});
