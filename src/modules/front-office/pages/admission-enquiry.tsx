import { useToast } from "@/providers/toast-context";

const AdmissionEnquiry = () => {
  const toast = useToast();

  function showToast() {
    toast.info("this is a toast");
  }

  return <button onClick={showToast}>Admission Enquiry</button>;
};

export default AdmissionEnquiry;
