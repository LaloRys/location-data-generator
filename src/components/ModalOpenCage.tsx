import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";

export default function ModalOpenCage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="bordered">
        Instructions
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Instructions
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-center text-sm font-semibold">
                    Make sure you have an Excel file with a sheet that contains
                    two columns titled "latitude" and "longitude," both in
                    lowercase. You can organize the data however you prefer
                    within these columns. Check that the headings are spelled
                    correctly.
                  </p>
                  <Divider className="my-2"/>
                  <p className="text-tiny text-center uppercase font-bold">
                    You must enter your opencage API KEY
                  </p>
                  <Divider className="my-2"/>

                  <small className="text-default-500">
                    The free trial has 2,500 API requests per day for testing.
                  </small>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
