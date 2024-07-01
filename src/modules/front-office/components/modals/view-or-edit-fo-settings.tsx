import { Card, CardBody, Input, Textarea } from "@nextui-org/react";
import React from "react";

import { ViewOrEditSettingsProps } from "../../types";

import { convertToTitleCase } from "@/utils";

const ViewOrEditFOSetting: React.FC<ViewOrEditSettingsProps> = ({
  data = {},
  isReadOnly = false,
}) => {
  if (!Boolean(data)) return null;

  const defaultValue = data && data.type ? data[data.type] : undefined;

  return (
    <Card className="w-full p-0" shadow="none">
      <CardBody className="flex gap-3 p-0">
        <Input
          defaultValue={defaultValue}
          isClearable={!isReadOnly}
          isRequired={!isReadOnly}
          label={`${convertToTitleCase(defaultValue)}`}
          placeholder={`Enter ${defaultValue.toLowerCase()}`}
          readOnly={isReadOnly}
        />
        <Textarea
          defaultValue={data.description}
          label={"Description"}
          placeholder="Enter description here"
          readOnly={isReadOnly}
        />
      </CardBody>
    </Card>
  );
};

export default ViewOrEditFOSetting;
