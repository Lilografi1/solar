import * as THREE from "three";

import { OrbitControls} from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const estrelas = [];

for (let i = 0; i < 10000; i++) {
    estrelas.push(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500
    )
    
}

const geometriaEstrelas = new THREE.BufferGeometry();

geometriaEstrelas.setAttribute("position", new THREE.Float32BufferAttribute(estrelas,3));

scene.add(
    new THREE.Points(
        geometriaEstrelas,
        new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.2
        })
    )
);

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,15,25)

const renderer = new THREE.WebGLRenderer();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
)


document.body.appendChild(
    renderer.domElement
)

const controls = new OrbitControls(
    camera,
    renderer.domElement
)

const light = new THREE.PointLight(
    0xffffff,
    3000
)

scene.add(light);

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(
        13,
        32,
        32
    ),
    new THREE.MeshBasicMaterial({
        color: 0xffcc33
    })
)

scene.add(sun)

const mercuryOrbit = new THREE.Group();
scene.add(mercuryOrbit)

const mercury = new THREE.Mesh(
    new THREE.SphereGeometry(
        1,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0xA5948F
    })
)

mercury.position.x = 22;
mercuryOrbit.add(mercury)

const venusOrbit = new THREE.Group();
scene.add(venusOrbit)

const venus = new THREE.Mesh(
    new THREE.SphereGeometry(
        1.2,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0xF5AC4F
    })
)

venus.position.x = 29;

venusOrbit.add(venus)

const terraOrbit = new THREE.Group();
scene.add(terraOrbit)

const terra = new THREE.Mesh(
    new THREE.SphereGeometry(
        1.5,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0x4997E9
    })
)

terra.position.x = 34;

terraOrbit.add(terra)

const marteOrbit = new THREE.Group();
scene.add(marteOrbit)

const marte = new THREE.Mesh(
    new THREE.SphereGeometry(
        1.3,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0xDF7047
    })
)

marte.position.x = 39;

marteOrbit.add(marte)

const jupterOrbit = new THREE.Group();
scene.add(jupterOrbit)

const jupter = new THREE.Mesh(
    new THREE.SphereGeometry(
        4.6,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0xD99964
    })
)

jupter.position.x = 52;
jupterOrbit.add(jupter)

const saturnOrbit = new THREE.Group();
scene.add(saturnOrbit)

const saturn = new THREE.Mesh(
    new THREE.SphereGeometry(
        4,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0xE7B771
    })
)

saturn.position.x = 64;
saturnOrbit.add(saturn)

const anel = new THREE.Mesh(
    new THREE.RingGeometry(9,5,65),
    new THREE.MeshBasicMaterial({
        color: 0xd8c08a,
        side: THREE.DoubleSide
    })
)

anel.rotation.x = 300

saturn.add(anel);

const uranoOrbit = new THREE.Group();
scene.add(uranoOrbit)

const urano = new THREE.Mesh(
    new THREE.SphereGeometry(
        3.4,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0x60C1ED
    })
)

urano.position.x = 78;
uranoOrbit.add(urano)

const anelUrano = new THREE.Mesh(
    new THREE.RingGeometry(4,5,65),
    new THREE.MeshBasicMaterial({
        color: 0xACE0E7,
        side: THREE.DoubleSide
    })
)

anelUrano.rotation.x = 300

urano.add(anelUrano);

const netunoOrbit = new THREE.Group();
scene.add(netunoOrbit)

const netuno = new THREE.Mesh(
    new THREE.SphereGeometry(
        3.6,
        32,
        32
    ),
    new THREE.MeshStandardMaterial({
        color: 0x4552A5
    })
)

netuno.position.x = 87;
netunoOrbit.add(netuno)

const nomes = [
    [mercury, "mercurio"],
    [venus, "venus"],
    [terra, "terra"],
    [marte, "marte"],
    [jupter, "jupter"],
    [saturn, "saturno"],
    [urano, "urano"],
    [netuno, "netuno"],
]

nomes.forEach(([planeta,nome]) =>{
    planeta.nome = document.createElement("div");

    planeta.nome.textContent = nome;

    planeta.nome.style.cssText = `
        position:absolute;
        color:white;
        font:bold 12px Arial;
        transform:translate(-50%, -100%);
        border: solid 1px white;
        border-radius: 13px;
        padding: 3px;
        background: #540606df
    `

    document.body.appendChild(planeta.nome)
})

function animate() {
    requestAnimationFrame(animate);

    mercuryOrbit.rotation.y += 0.0035;
    mercury.rotation.y += 0.09;

    venusOrbit.rotation.y += 0.004;
    venus.rotation.y += 0.09;

    terraOrbit.rotation.y += 0.003;
    terra.rotation.y += 0.09;

    marteOrbit.rotation.y += 0.0045;
    marte.rotation.y += 0.09;

    jupterOrbit.rotation.y += 0.0038;
    jupter.rotation.y += 0.09;

    saturnOrbit.rotation.y += 0.0033;
    saturn.rotation.y += 0.09;
    
    uranoOrbit.rotation.y += 0.0029;
    urano.rotation.y += 0.09;

    netunoOrbit.rotation.y += 0.0025;
    netuno.rotation.y += 0.09;

    nomes.forEach(([planeta]) =>{
        const pos = new THREE.Vector3();

        planeta.getWorldPosition(pos)

        pos.project(camera);
        planeta.nome.style.left =`${(pos.x * 0.5 + 0.5) * innerWidth}px`
        planeta.nome.style.top =`${(-pos.y * 0.5 + 0.47) * innerHeight}px`
    })

    controls.update();

    renderer.render(scene, camera);
}

animate();