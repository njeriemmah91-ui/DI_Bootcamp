import random


class Temperature:
    # Base class for temperature
    def __init__(self, value):
        self.value = value


class Celsius(Temperature):
    # Celsius temperature conversions
    def to_fahrenheit(self):
        return Fahrenheit(self.value * 9/5 + 32)

    def to_kelvin(self):
        return Kelvin(self.value + 273.15)


class Fahrenheit(Temperature):
    # Fahrenheit temperature conversions
    def to_celsius(self):
        return Celsius((self.value - 32) * 5/9)

    def to_kelvin(self):
        return Kelvin((self.value - 32) * 5/9 + 273.15)


class Kelvin(Temperature):
    # Kelvin temperature conversions
    def to_celsius(self):
        return Celsius(self.value - 273.15)

    def to_fahrenheit(self):
        return Fahrenheit((self.value - 273.15) * 9/5 + 32)


class QuantumParticle:
    # Represents a quantum particle with entanglement behavior
    def __init__(self, x=None, y=None, p=None):
        self.x = x if x is not None else random.randint(1, 10000)
        self.y = y if y is not None else random.random()
        self.p = p if p is not None else random.choice([0.5, -0.5])
        self.entangled_particle = None

    def disturb(self):
        self.x = random.randint(1, 10000)
        self.y = random.random()
        print("Quantum Interferences!!")

    def position(self):
        self.disturb()
        return self.x

    def momentum(self):
        self.disturb()
        return self.y

    def spin(self):
        self.p = random.choice([0.5, -0.5])
        if self.entangled_particle:
            self.entangled_particle.p = -self.p
        self.disturb()
        return self.p

    def entangle(self, other):
        if not isinstance(other, QuantumParticle):
            print("Can only entangle with another QuantumParticle")
            return
        self.entangled_particle = other
        other.entangled_particle = self
        print("Spooky Action at a Distance !!")

    def __repr__(self):
        return f"QuantumParticle(position={self.x}, momentum={self.y}, spin={self.p})"


if __name__ == "__main__":
    c = Celsius(25)
    print(c.to_fahrenheit().value)
    print(c.to_kelvin().value)

    p1 = QuantumParticle()
    p2 = QuantumParticle()
    p1.entangle(p2)

    print(p1.spin())
    print(p2.spin())