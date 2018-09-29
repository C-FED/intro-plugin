interface iTipConfig {
    helpLayer: any,
    referenceLayer: any,
    dirData: object
}

let config: iTipConfig = {
    helpLayer: null,
    referenceLayer: null,
    dirData: { // TODO
        tipBox: {
            "TR": "tip-tr",
            "RT": "tip-rt",
            "BR": "tip-br",
            "LB": "tip-lb"
        },
        tipTra: {
            "TR": "tra-bottom",
            "RT": "tra-left",
            "BR": "tra-top",
            "LB": "tra-right"
        }
    }
};

export default config;