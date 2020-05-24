import React, { useState, useEffect, useContext } from "react";
import { View, Picker, Text, Modal, ActivityIndicator, ScrollView } from "react-native";
import styles from "./styles";
import Container from "../../../components/Container";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import colors from "../../../../assets/styles/colorVariables";
import { CategoryContext } from "../../../store/contexts/categoryContext";
import helpService from "../../../services/Help";
import { UserContext } from "../../../store/contexts/userContext";

export default function CreateHelp({ navigation }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState({});
  const [description, setDescription] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVerification, setModalVerification] = useState(true);
  const [loading, setloading] = useState(false);
  const [requestState, setRequestState] = useState("");
  const [textLength, setTextLength] = useState(0);

  const { categories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    switch (requestState) {
      case "waiting":
        setloading(true);
        break;
      case "success":
        setloading(false);
        setModalVisible(true);
        setModalVerification(true);
        setRequestState("");
        setTitle("");
        setDescription("");
        setCategory({});
        break;
      case "fail":
        setloading(false);
        setModalVisible(true);
        setModalVerification(false);
        setRequestState("");
        break;
      case "":
        break;
      default:
        setRequestState("");
        setModalVisible(true);
        setModalVerification(false);
        break;
    }
  }, [requestState]);

  useEffect(() => {
    if (title && category && description) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [title, description, category]);

  function createHelp() {
    const { _id: userId } = user;

    setRequestState("waiting");
    helpService
      .createHelp(title, category["_id"], description, userId)
      .then((res) => {
        setRequestState("success");
      })
      .catch((err) => {
        setRequestState("fail");
      });
  }
  return (
    <ScrollView>
      <Container>
        <View style={styles.view}>
          <View>
            <Input label="Título" change={(text) => setTitle(text)} />
            <View style={styles.margiView} />
            <View>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.picker}>
                <Picker
                  label="Categoria"
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                >
                  <Picker.Item label="" value={{}} />
                  {categories.map((cat) => (
                    <Picker.Item
                      key={cat._id}
                      color={colors.dark}
                      label={cat.name}
                      value={cat}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.margiView} />
            <Input
              label="Descrição"
              textarea
              change={(text) => setDescription(text)}
            />
            <Text>{description.length}/300</Text>
          </View>

          <View style={styles.btnContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <Button
                title="Preciso de ajuda"
                large
                disabled={buttonDisabled}
                press={createHelp}
              />
            )}
          </View>
        </View>
      </Container>

      <View style={styles.fullScreen}>
        <View style={styles.centeredView}>
          <Modal
            transparent={true}
            style={styles.modal}
            animationType="fade"
            visible={modalVisible}
          >
            <View style={[styles.backdrop, styles.centeredView]}>
              <View style={styles.modalView}>
                {modalVerification ? (
                  <Text style={styles.modalText}>
                    Sua solicitação de ajuda foi criada com sucesso!
                  </Text>
                ) : (
                  <Text style={styles.modalText}>
                    Houve algum problema com sua solicitação. Tente mais tarde.
                  </Text>
                )}

                <Button
                  type={modalVerification ? null : "danger"}
                  large
                  press={() => {
                    setModalVisible(!modalVisible);

                    modalVerification ? navigation.navigate("main") : null;
                  }}
                  title="OK"
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
}
