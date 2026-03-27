import math


class Circle:
    # Represents a circle with radius and diameter support
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.diameter = diameter
        else:
            raise ValueError("Provide radius or diameter")

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = float(value)

    @property
    def diameter(self):
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        if value < 0:
            raise ValueError("Diameter cannot be negative")
        self._radius = float(value) / 2

    def area(self):
        return math.pi * self._radius ** 2

    def __repr__(self):
        return f"Circle(radius={self._radius})"

    def __str__(self):
        return f"Circle with radius {self._radius}"

    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self._radius + other._radius)
        return NotImplemented

    def __gt__(self, other):
        if isinstance(other, Circle):
            return self._radius > other._radius
        return NotImplemented

    def __eq__(self, other):
        if isinstance(other, Circle):
            return self._radius == other._radius
        return NotImplemented

    def __lt__(self, other):
        if isinstance(other, Circle):
            return self._radius < other._radius
        return NotImplemented


if __name__ == "__main__":
    c1 = Circle(radius=5)
    c2 = Circle(diameter=10)
    c3 = Circle(radius=3)

    print(c1.area())
    print(c1)

    c4 = c1 + c3
    print(c4)

    print(c1 > c3)
    print(c1 == c2)

    circles = [c1, c2, c3, c4]
    circles.sort()
    print(circles)