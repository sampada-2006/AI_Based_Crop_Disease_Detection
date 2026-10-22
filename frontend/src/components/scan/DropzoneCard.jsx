import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Camera, FolderOpen, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function DropzoneCard() {
  const { t } = useTranslation();
  const {
    selectedImage,
    setSelectedImage,
    isBlurry,
    setIsBlurry,
    setPendingScenario,
    showQualityDetails,
  } = useApp();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const cameraInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const validateAndProcessFile = (file) => {
    setErrorMessage(null);
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(t("scan.errorInvalidType"));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(t("scan.errorTooLarge"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (dataUrl) {
        setSelectedImage(dataUrl);
        setIsBlurry(false);
        setPendingScenario(null); // Uploaded custom file uses sampleHigh by default
      }
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndProcessFile(file);
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    validateAndProcessFile(file);
  };

  const handleChangePhoto = () => {
    setSelectedImage(null);
    setIsBlurry(false);
    setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />

      {!selectedImage ? (
        /* Dashed dropzone state */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
            isDragging
              ? "border-primary bg-emerald-50/50"
              : "border-border hover:border-primary/50 bg-[#F9FBFA]"
          }`}
        >
          {/* Camera Icon */}
          <div className="w-14 h-14 rounded-2xl bg-sidebar flex items-center justify-center text-white mb-4 shadow-sm">
            <Camera className="w-7 h-7 text-emerald-300" />
          </div>

          <h3 className="text-base font-bold text-text mb-1">
            {t("scan.dropzoneTitle")}
          </h3>
          <p className="text-xs text-muted mb-6">
            {t("scan.dropzoneSub")}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-sm">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex-1 min-w-[130px] bg-primary hover:bg-primary-dark text-white rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{t("scan.openCamera")}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 min-w-[130px] bg-white hover:bg-page-bg border border-border text-text rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <FolderOpen className="w-4 h-4 text-muted" />
              <span>{t("scan.chooseFile")}</span>
            </button>
          </div>

          {/* Inline danger message if rejected */}
          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-danger-bg border border-danger-border text-danger text-xs font-medium flex items-center gap-2 animate-fade-in">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* Photo preview state */
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-border bg-black/5 flex items-center justify-center min-h-[220px] max-h-[320px]">
            <img
              src={selectedImage}
              alt="Leaf Preview"
              className={`w-full max-h-[320px] object-contain transition-all ${
                isBlurry ? "blur-xs" : ""
              }`}
            />

            {/* Change photo button */}
            <button
              type="button"
              onClick={handleChangePhoto}
              className="absolute top-3 right-3 bg-white/95 hover:bg-white text-text border border-border rounded-lg px-3 py-1.5 text-xs font-semibold shadow-xs flex items-center gap-1.5 backdrop-blur-xs transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-muted" />
              <span>{t("scan.changePhoto")}</span>
            </button>
          </div>

          {/* Quality Banner (HCI error prevention) */}
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
              isBlurry
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-emerald-50 border-emerald-200 text-emerald-900"
            }`}
          >
            {isBlurry ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs">
              <p className="font-bold">
                {isBlurry ? t("qualityBlurry") : t("qualityGood")}
              </p>
              {showQualityDetails && (
                <p className="mt-0.5 opacity-90">
                  {isBlurry
                    ? t("scan.qualityBlurryDetail")
                    : t("scan.qualityGoodDetail")}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
