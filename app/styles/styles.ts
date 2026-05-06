import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },

  card: {
    width: "100%",
    maxWidth: 760,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 40,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "800",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 18,
  },

  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 16,
    textAlign: "left",
  },

  subtitle: {
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

  secondaryButton: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 24,
  },

  secondaryButtonText: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "900",
  },

  placeholderMap: {
    height: 320,
    borderRadius: 22,
    backgroundColor: "#DCFCE7",
    borderWidth: 2,
    borderColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  placeholderText: {
    color: "#166534",
    fontSize: 20,
    fontWeight: "900",
  },

  mapPage: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 24,
  },

  mapHeader: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  mapTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 10,
  },

  mapSubtitle: {
    fontSize: 17,
    lineHeight: 25,
    color: "#475569",
    maxWidth: 850,
  },

  smallButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: "center",
  },

  smallButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  mapContent: {
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },

  mapPanel: {
    width: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  panelTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 10,
  },

  panelText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 20,
  },

  legendContainer: {
    gap: 14,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  legendColor: {
    width: 18,
    height: 18,
    borderRadius: 999,
    marginTop: 3,
  },

  legendTextBox: {
    flex: 1,
  },

  legendTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 3,
  },

  legendDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#64748B",
  },

  infoBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 16,
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1E3A8A",
    marginBottom: 8,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#1E40AF",
  },

  mapCardLarge: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
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
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },

  mapLoadingText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },

  metricGrid: {
    gap: 12,
    marginTop: 10,
  },

  metricCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    padding: 16,
  },

  metricNumber: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 4,
  },

  metricLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },
});

export default styles;