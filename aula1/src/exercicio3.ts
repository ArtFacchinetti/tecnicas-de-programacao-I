function run3(): void {
    function operarTres(v1: Array<number>, v2: Array<string>): Array<string> {
        let res: Array<string> = [];
        for (let i = 0; i < v1.length; i++) {
            res[i] = v1[i] + v2[i];
        }
        return res;
    }
    let vet1: Array<number> = [5, 3, 1, 8, 2];
    let vet2: Array<string> = ["M", "a", "r", "i", "a"];
    console.log("Resultado:", operarTres(vet1, vet2));

}
run3()