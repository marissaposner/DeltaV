from setuptools import find_packages
from setuptools import setup

__version__ = "0.1"

setup(
    name="backend",
    version=__version__,
    packages=find_packages(exclude=["tests"]),
    install_requires=[
        "marshmallow-sqlalchemy",
        "python-dotenv",
        "passlib",
        "apispec[yaml]",
        "apispec-webframeworks",
    ]
)
