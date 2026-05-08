import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  homeCard: {
    width: "100%",
    maxWidth: 820,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 42,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "900",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 18,
  },

  homeTitle: {
    fontSize: 46,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 16,
  },

  homeSubtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: "#475569",
    marginBottom: 24,
  },

  moduleBox: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },

  moduleTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
  },

  moduleText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },

  mapPage: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 18,
    minHeight: "100%",
  },

  mapHeader: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  mapHeaderText: {
    flex: 1,
  },

  mapTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 10,
  },

  mapSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#475569",
    maxWidth: 950,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerLocationButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  headerLocationButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  smallButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
  },

  smallButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  mapContent: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    minHeight: 660,
  },

  mapPanel: {
    width: 410,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  panelTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 10,
  },

  panelText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#475569",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#0F172A",
    marginBottom: 10,
  },

  resultList: {
    gap: 8,
  },

  resultItem: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  routeDot: {
    width: 14,
    height: 14,
    borderRadius: 999,
    marginTop: 4,
  },

  resultTextBox: {
    flex: 1,
  },

  resultTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
  },

  resultDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
    marginTop: 2,
  },

  selectedRouteBox: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
  },

  selectedRouteTitle: {
    fontSize: 13,
    color: "#1D4ED8",
    fontWeight: "900",
    marginBottom: 4,
  },

  selectedRouteText: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "800",
  },

  fieldLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: "#334155",
    marginBottom: 6,
    marginTop: 8,
  },

  pointText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "700",
    marginBottom: 8,
  },

  inlineButtonRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },

  miniButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  miniButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  miniButtonLight: {
    flex: 1,
    backgroundColor: "#E0F2FE",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  miniButtonLightText: {
    color: "#075985",
    fontSize: 12,
    fontWeight: "900",
  },

  locationStatus: {
    fontSize: 14,
    fontWeight: "900",
    color: "#2563EB",
    marginBottom: 10,
  },

  locationDataBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
    gap: 4,
  },

  locationData: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "800",
  },

  locationError: {
    fontSize: 13,
    lineHeight: 18,
    color: "#DC2626",
    fontWeight: "800",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },

  locationButtonRow: {
    flexDirection: "row",
    gap: 10,
  },

  locationPrimaryButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: "center",
  },

  locationPrimaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },

  locationSecondaryButton: {
    backgroundColor: "#E0F2FE",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },

  locationSecondaryButtonText: {
    color: "#075985",
    fontSize: 13,
    fontWeight: "900",
  },

  locationStopButton: {
    marginTop: 10,
    backgroundColor: "#FEE2E2",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center",
  },

  locationStopButtonText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "900",
  },

  subsectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 10,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 19,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 10,
  },

  stopCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 10,
    marginBottom: 8,
  },

  stopTitle: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "900",
  },

  stopText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 2,
  },

  stopDistance: {
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "900",
    marginTop: 4,
  },

  alternativeCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 16,
    padding: 13,
    marginBottom: 10,
  },

  alternativeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },

  alternativeTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },

  transferBadge: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 11,
    fontWeight: "900",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
  },

  alternativeType: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "900",
    marginBottom: 6,
  },

  alternativeText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
    marginBottom: 6,
  },

  alternativeLabel: {
    fontSize: 12,
    color: "#0F172A",
    fontWeight: "900",
    marginTop: 4,
  },

  mapCardLarge: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    minHeight: 660,
  },

  leafletWrapper: {
    flex: 1,
    minHeight: 640,
    borderRadius: 22,
    overflow: "hidden",
  },

  mapLoading: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },

  mapLoadingText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "900",
  },

  mapLayerInfo: {
    position: "absolute",
    left: 20,
    bottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },

  mapLayerInfoTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 3,
  },

  mapLayerInfoText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#475569",
  },

  mapLayerInfoHint: {
    fontSize: 12,
    fontWeight: "900",
    color: "#DC2626",
    marginTop: 6,
  },
});

export default styles;
